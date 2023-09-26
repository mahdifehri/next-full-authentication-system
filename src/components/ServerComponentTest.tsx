import { getAuthSession } from '@/lib/auth'


export default async function ServerComponentTest() {
const session= await getAuthSession()

return <div> server component: <div className='text-3xl'>Hello {session?.user?.email} !</div></div>

}

