import { useEffect, useRef } from "react"
import { motion } from 'framer-motion'

export default function EndGameModal({gameState, answer}){

    useEffect(function() {
        dialogElement.current.showModal()
    },[])

    const dialogElement = useRef()

    return (
        <motion.dialog 
            className='end-game-modal' 
            ref={dialogElement} 
            onClick={()=>{dialogElement.current.close()}}
            initial={{opacity:0}}
            animate={{opacity:.95}}
            transition={{duration:1, ease:'anticipate', delay:1}}
        >
            {gameState==="won" 
                ? <h1>You won!</h1> 
                : <div>
                    <h1>Sorry</h1>
                    <p>The answer was:</p>
                    <h2>{answer}</h2>
                </div>
            }

        </motion.dialog>
    )
}