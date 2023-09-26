"use client"
import { useSession } from "next-auth/react"


export default  function ClientComponentTest() {
const { data: session, status } = useSession()

if (status === "authenticated") {
return(
    <div> client component: <div className='text-3xl'>Hello {session.user.email} !</div></div>
    )
  }

  return <p>please Sign in</p>
}