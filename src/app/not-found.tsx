import { NotFoundContainer, NotFoundImage, HomeButton } from './styles'

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundImage
        src='/images/404.svg'
        alt=''
        width={448}
        height={240}
        priority
        data-testid='404-image'
      />
      <h1 data-testid='404-heading'>Page Not Found</h1>
      <HomeButton as='a' href='/' data-testid='home-link'>
        Go Home
      </HomeButton>
    </NotFoundContainer>
  )
}

export default NotFound
