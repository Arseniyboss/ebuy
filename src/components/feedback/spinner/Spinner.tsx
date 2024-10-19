import {
  LoaderContainer,
  RainbowLoader,
  StripeLoader,
  PrimaryLoader,
  TransparentCircle,
} from './styles'

type Props = {
  variant: 'primary' | 'stripe' | 'rainbow'
}

const Spinner = ({ variant }: Props) => {
  return (
    <LoaderContainer>
      {variant === 'primary' && (
        <PrimaryLoader>
          <TransparentCircle />
        </PrimaryLoader>
      )}
      {variant === 'stripe' && (
        <StripeLoader>
          <TransparentCircle />
        </StripeLoader>
      )}
      {variant === 'rainbow' && (
        <RainbowLoader>
          <TransparentCircle />
        </RainbowLoader>
      )}
    </LoaderContainer>
  )
}

export default Spinner
