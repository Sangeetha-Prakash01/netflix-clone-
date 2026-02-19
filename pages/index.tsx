import Head from 'next/head';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

import styles from '../styles/Login.module.scss';

import { ROUTES } from '../config/route';

export default function Home(): React.ReactElement {
  const router: NextRouter = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const onSignIn = async () => {
    setError('');
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const { data } = await axios.post(endpoint, { email, password });
      if (data.token) {
        localStorage.setItem('token', data.token);
        router.push(ROUTES.BROWSE);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <meta name='description' content='Netflix clone, made using Next.js' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Image src="/assets/loginBg.jpg" alt='background image' layout='fill' className={styles.main__bgImage} />
        <div className={styles.main__card}>
          <h1>
            Nextflix
          </h1>
          <p>A simple Netflix clone built using Next.js</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', margin: '20px 0' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '10px', borderRadius: '4px', border: 'none', width: '100%', fontSize: '1rem' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '10px', borderRadius: '4px', border: 'none', width: '100%', fontSize: '1rem' }}
            />
          </div>

          {error && <div style={{ color: '#e50914', marginBottom: '10px', fontSize: '0.9rem' }}>{error}</div>}

          <div className={styles.button} onClick={onSignIn}>
            {isLogin ? 'Sign in' : 'Register'}
          </div>

          <div
            style={{ marginTop: '15px', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline', color: '#fff' }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'New to Nextflix? Sign up now.' : 'Already have an account? Sign in.'}
          </div>
        </div>
      </main>
    </div>
  );
}
