import { useState , useContext } from 'react';
import './signup.css'    
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth'; 

function SignUp(){
   const [email, setEmail]= useState('');
   const [password , setPassword] = useState('');
   const [nome , setNome] = useState('');
   const { signUp , loadingAuth } = useContext(AuthContext);

  function handleSubmit(e){
        e.preventDefault();
        if(nome !== '' && email !== '' && password !== ''){
            signUp(email, password, nome);
        }
  }   
    return(
        <div className="container">
            <div className="login">
              <div className="login-area">
                  <img src={logo} alt="Sistema logo"/>
              </div>
                <form onSubmit={handleSubmit}>
                    <h1>Cadastrar</h1>
                    <input type="text" placeholder="dgite nome"  value={nome} onChange={(e)=>setNome(e.target.value)} />
                    <input type="text" placeholder="email@email.com" value={email} onChange={ (e)=> setEmail(e.target.value)} />
                    <input type="password" placeholder="*********" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="submit">{loadingAuth ? 'Carregando..' : 'Cadastrar'}</button>
                </form>

                <Link to="/">Já tem uma conta? Entrar</Link>
            </div>
        </div>
    );
}
export default SignUp;