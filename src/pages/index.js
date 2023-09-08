import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import  setnestlogo from '../../public/assets/Setnest-copy.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className={`${styles.main}`}>
        <button type='button' className={`${styles.iconBtn}`}>
        <FontAwesomeIcon icon="fa-solid fa-arrow-left" className={`${styles.iconleftBtn}`}/>
        </button>
        <div className='row'>
          <div className='col-12'>
            <div className='padding-3em'>
              <Image src={setnestlogo} className='img-fluid'/>
              <h6>Helping you find a home!</h6>
            </div>
            <div>
              <div className={`${styles.search}`}>
                <input type='text' placeholder='Enter Neighbourhood or Post Code'/>
              </div>
              <div className={`${styles.btnsDiv}`}>
              <Link href="/login">
                <button type='button' className={`${styles.activeButton}`}>Login</button>
                </Link>
              <Link href="/signup">
              <button type='button' className={`${styles.inactiveButton}`}>Sign Up</button>
                </Link>
              </div>
            
            </div>
          
          </div>
        </div>
      
      </div>
     
    </>
  )
}
