import { useRouter } from 'next/router'

const IndexPage = () => {
  const router = useRouter()
  return (
    <>
      <div onClick={() => router.push('/about')}>
        GO TO ABOUT (with <code>router</code>)
      </div>
    </>
  )
}

export default IndexPage
