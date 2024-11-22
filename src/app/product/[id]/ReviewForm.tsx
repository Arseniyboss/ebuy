'use client'

import { useRouter } from 'next/navigation'
import { useForm } from '@/hooks/useForm'
import { PageParams } from '@/types/params'
import { CreateReviewParams as Values } from '@/types/params'
import { validationSchema } from '@/validation/schemas/reviewSchema'
import { Input } from '@/styles/globals'
import { Form, FormGroup, FormError, FormButton } from '@/styles/form'
import { createReview } from '@/api/products/createReview'
import { revalidateTag } from '@/api/revalidateTag'
import Message from '@/components/feedback/message/Message'

const ReviewForm = ({ params }: PageParams) => {
  const initialValues: Values = {
    rating: 0,
    comment: '',
  }

  const router = useRouter()

  const onSubmit = async () => {
    const { id } = await params
    const { error } = await createReview(id, values)
    if (error) return error
    router.refresh()
    revalidateTag('product')
    alert('Review submitted!')
    setValues(initialValues)
  }

  const {
    values,
    errors,
    error,
    loading,
    isValid,
    setValues,
    handleChange,
    handleSubmit,
  } = useForm({
    initialValues,
    onSubmit,
    validationSchema,
  })
  return (
    <Form onSubmit={handleSubmit} data-testid="review-form" $center={false}>
      <h2>Write a review</h2>
      {error && <Message variant="error">{error}</Message>}
      <FormGroup>
        <label htmlFor="rating">Rating</label>
        <Input
          name="rating"
          id="rating"
          as="select"
          value={values.rating}
          onChange={handleChange}
          aria-required
          aria-describedby={errors.rating && 'rating-error'}
          data-testid="rating-select"
        >
          <option value="">Select</option>
          <option value="1">1 - Terrible</option>
          <option value="2">2 - Bad</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </Input>
        {errors.rating && (
          <FormError id="rating-error" aria-live="assertive" data-testid="rating-error">
            {errors.rating}
          </FormError>
        )}
      </FormGroup>
      <FormGroup>
        <label htmlFor="comment">Comment</label>
        <Input
          name="comment"
          id="comment"
          as="textarea"
          rows={5}
          value={values.comment}
          onChange={handleChange}
          data-testid="comment-input"
        />
      </FormGroup>
      <FormButton disabled={!isValid || loading} data-testid="submit-button">
        Submit
      </FormButton>
    </Form>
  )
}

export default ReviewForm
