import { useState , useContext } from 'react';
import './signin.css'    
import vendas from '../../assets/nova.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';


function SignIn(){
   const [email, setEmail]= useState('');
   const [password , setPassword]  = useState('');
   const { signIn , loadingAuth } = useContext(AuthContext);

   function handleSubmit(e){
        e.preventDefault();
        
        if(email !== '' && password !== ''){
            signIn(email, password);
        }

    }
    return(
        <div className="container-center">
            <div className="login">
              <div className="login-area">
                  <img src={vendas} alt="Sistema logo"/>
              </div>
                <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input type="text" placeholder="email@email.com" value={email} onChange={ (e)=> setEmail(e.target.value)}/>
                    <input type="password" placeholder="*********"   value={password} onChange={(e)=> setPassword(e.target.value)} />
                    <button type="submit">{loadingAuth ? 'Carregando..' : 'Acessar'}</button>
                </form>
                <Link to="/register"> Criar uma Conta</Link>
            </div>
        </div>
    );
}
export default SignIn;