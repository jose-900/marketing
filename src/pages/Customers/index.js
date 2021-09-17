import './customers.css';
import Title from '../../components/Title';
import Header from '../../components/Header';
import { useState } from 'react';
import { FiUser} from 'react-icons/fi';
import firebase from '../../services/firebaseConnection';


export default function Customers(){
    const [nomeFantasia , setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const[endereco, setEndereco] = useState('');

   async function handleAdd(e){
       e.preventDefault();
              
        if(nomeFantasia !== '' && cnpj !== '' && endereco !== ''){
             await firebase.firestore().collection('customers')
             .add({
                 nome: nomeFantasia,
                 cnpj: cnpj,
                 endereco: endereco
             })
             .then(()=>{
                 setNomeFantasia('');
                 setCnpj('');
                 setEndereco('');
                 
             })
             
        } 
          

    }

    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Clientes">
                    <FiUser size={24} />
                </Title>
                <div className="container">
                    <form className="form-profile customer" onSubmit={handleAdd}>
                        <label>Nome Fantasia</label>
                        <input type="text" placeholder="Nome da empresa" value={nomeFantasia} onChange={(e)=>setNomeFantasia(e.target.value)}/>

                        <label>CNPJ</label>
                        <input type="text" placeholder="Cnpj da empresa" value={cnpj} onChange={(e)=>setCnpj(e.target.value)}/>

                        <label>Endereço</label>
                        <input type="text" placeholder="Endereço comercial " value={endereco} onChange={(e)=>setEndereco(e.target.value)}/>

                        <button type="submit">Cadastrar</button>


                    </form>
                </div>

            </div>

        </div>
    )
}