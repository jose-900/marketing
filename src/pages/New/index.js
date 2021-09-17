import './new.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlusCircle} from 'react-icons/fi';
import {useState , useEffect, useContext} from 'react';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import { useHistory, useParams } from 'react-router-dom';


export default function New(){
    const [customers , setCustomers] = useState([]);
    const [loadCustomers , setLoadCustomers] = useState(true);
    const[customerSelected, setCustomerSelected] = useState(0);

    const [assunto, setAssunto] = useState('Suporte');
    const[status, setStatus] = useState('Aberto');
    const[complemento , setComplemento] = useState('');
    const {user } = useContext(AuthContext);

    const { id } = useParams();
    const history = useHistory();

    const [idCustomer, setIdCustomer]  = useState(false);

    useEffect(()=>{
        async function loadCustomers(){
            await firebase.firestore().collection('customers')
            .get()
            .then((snapshot)=>{
                let lista = [];

                snapshot.forEach((doc)=> {
                    lista.push({
                        id: doc.id,
                        nome: doc.data().nome
                    })
                })
                if(lista.length === 0){
                    console.log('Nehuma empresa Cadastrada.');
                    setCustomers([ { id: '1' , nome:'Empresa inesistente'} ]);
                    setLoadCustomers(false);
                    return;
                }

                setCustomers(lista);
                setLoadCustomers(false);

                if(id){
                    loadId(lista);
                }


            })
            .catch((error)=> {
                console.log('Ocorreu de conexão com banco de dados' , error);
                setLoadCustomers(false);
                setCustomers([ { id: '1' , nome:''} ]);
            })
        }

        loadCustomers();
    
    }, [id]);

    async function loadId(lista){
        await firebase.firestore().collection('chamados').doc(id)
        .get()
        .then((snapshot)=>{
            setAssunto(snapshot.data().assunto);
            setStatus(snapshot.data().status);
            setComplemento(snapshot.data().complemento)
            let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
            setCustomerSelected(index);
            setIdCustomer(true);

        })
        .catch((error)=>{
            console.log(error);
            setIdCustomer(false);
        })
    }

    async function handleRegister(e){
        e.preventDefault();
        if(idCustomer){
            await firebase.firestore().collection('chamados')
            .doc(id)
            .update({
                cliente: customers[customerSelected].nome,
                clienteId:customers[customerSelected].id,
                assunto: assunto,
                status: status,
                complemento:complemento,
                userId: user.uid
            })
            .then(()=>{
                alert('Chamado alterado com sucesso');
                setCustomerSelected(0);
                setComplemento('');
                history.push('/dashboard');
            })
            .catch((error)=>{
                alert('Erro ao registrar' , + error);
            })

            return;
        }

        await firebase.firestore().collection('chamados')
        .add({
            created: new Date(),
            cliente: customers[customerSelected].nome,
            clienteId:customers[customerSelected].id,
            assunto: assunto,
            status: status,
            complemento:complemento,
            userId: user.uid
        })
        .then(()=>{
            setComplemento('');
            setCustomerSelected(0);
        })
        .catch((error)=>{
            console.log(error);
        })



    }
    //função é chamada quando troca o assunto
    function handleChangeSelect(e){
        setAssunto(e.target.value);
    }
    // função é chamada quando troca o status
    function handleOptionChange(e){
        setStatus(e.target.value);
    }
    // função é chamada quando seleciona a empresa
    function handleChangeCustomers(e){
        setCustomerSelected(e.target.value);
    }

    return(
        <div>
            <Header/>
            <div className="content">
                <Title name="Novo chamado">
                    <FiPlusCircle size={25}/>
                </Title>
                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Cliente</label>

                        {loadCustomers ? (
                            <input type="text" disabled={true} value="Carregando Clientes."  />
                        ): (
                            <select value={customerSelected} onChange={handleChangeCustomers}>
                                {customers.map((item,index)=>{
                                    return(
                                        <option key={item.id} value={index} >
                                            {item.nome}
                                        </option>
                                    )
                                })}
                            </select>   
                        )}
                        
                     <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Tecnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                     <label>Status</label>
                        <div className="status">
                            <input 
                                type="radio"
                                name="radio"
                                value="Aberto"
                                onChange={handleOptionChange}
                                checked={ status === 'Aberto'}
                            />
                            <span>Em Aberto</span>
                            <input 
                                type="radio"
                                name="radio"
                                value="Progresso"
                                onChange={handleOptionChange}
                                checked={ status === 'Progresso'}
                            />
                            <span>Progresso</span>
                            <input 
                                type="radio"
                                name="radio"
                                value="Atendido"
                                onChange={handleOptionChange}
                                checked={ status === 'Atendido'}
                            />
                            <span>Atendido</span>

                        </div>   
                        <label>Complemento</label>
                        <textarea  
                            type="text"
                            placeholder="Descreva seu problema(opcional)."
                            value={complemento}
                            onChange={ (e) => setComplemento(e.target.value) }
                         />
                        <button type="submit">Salvar</button>

                    </form>

                </div>
             </div>
        </div>
    )
}