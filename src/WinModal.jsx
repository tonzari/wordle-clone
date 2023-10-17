import { useEffect, useRef } from "react"

export default function WinModal(){

    useEffect(function() {
        dialogElement.current.showModal()
    },[])

    const dialogElement = useRef()

    return (
        <dialog ref={dialogElement} onClick={()=>{dialogElement.current.close()}}>
            <h1>You won!</h1>
            <p>Dang good job, son!</p>
        </dialog>
    )
}