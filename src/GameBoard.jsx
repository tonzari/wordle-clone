import {AnimatePresence, motion} from 'framer-motion'

export default function GameBoard({gameBoardData}){
    
    return (
        <div className='gameboard'>
        {
            gameBoardData.map((row, x) => {
                return row.map((tile, y) => {
                    const gridPos = (x*5)+y
                    return (
                        <motion.div
                            key={`${gridPos}-${tile.letter}`} 
                            className={tile.color + " tile"}
                            initial={{y: -5, rotateY:90}}
                            animate={{
                                y: [0,0,-5,5,0], 
                                rotateY:[90,90,120,0,0],
                                scale:[.8,.5,1.3,1.1,1]
                            }}
                            transition={{duration:.3, delay:y*0.15, ease:'circIn'}}
                        >
                            {tile.letter}
                        </motion.div>
                    )
                })
            })
        }
        </div>
    )
}