
import Link from 'next/link'

import SignUpForm from './SignUpForm'

const SignUp = () => {
  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Welcome</h1>
        <p className='text-sm max-w-xs mx-auto'>
        By proceeding, you are creating an account and consenting to our User Agreement and Privacy Policy.
        </p>
      </div>
      <SignUpForm />
      <p className='px-8 text-center text-sm text-muted-foreground'>
        Already have an account ?{' '}
        <Link
          href='/sign-in'
          className='hover:text-brand text-sm underline underline-offset-4'>
          Sign In
        </Link>
      </p>
    </div>
  )
}

export default SignUp
