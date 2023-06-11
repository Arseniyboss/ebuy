import {
  LoaderWrapper,
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
    <LoaderWrapper>
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
    </LoaderWrapper>
  )
}

export default Spinner
