'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from '@hooks/useForm'
import { useTimeout } from '@hooks/useTimeout'
import { PageParams } from 'types/params'
import { Values, validationSchema } from '@validation/schemas/reviewSchema'
import { Input } from '@styles/globals'
import { Form, FormGroup, FormError, FormButton } from '@styles/form'
import { createReview } from '@api/products/createReview'
import { revalidateTag } from '@api/revalidateTag'
import Message from '@components/message/Message'

const ReviewForm = ({ params }: PageParams) => {
  const initialValues: Values = {
    rating: '',
    comment: '',
  }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const onSubmit = async () => {
    setLoading(true)

    const response = await createReview(params.id, {
      comment: values.comment,
      rating: Number(values.rating),
    })

    if (!response.ok) {
      setLoading(false)
      setError(response.statusText)
      return
    }

    router.refresh()
    revalidateTag('product')
    alert('Review submitted!')
    setLoading(false)
    setValues(initialValues)
  }

  const { values, setValues, errors, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
    validationSchema,
  })

  useTimeout(
    () => {
      if (error) {
        setError('')
      }
    },
    3000,
    [error]
  )

  useEffect(() => {
    setError('')
  }, [errors])
  return (
    <Form onSubmit={handleSubmit} data-testid='review-form' $center={false}>
      <h2>Write a review</h2>
      {error && <Message variant='error'>{error}</Message>}
      <FormGroup>
        <label>Rating</label>
        <Input
          name='rating'
          as='select'
          value={values.rating}
          onChange={handleChange}
          data-testid='rating-select'
        >
          <option value=''>Select</option>
          <option value='1'>1 - Terrible</option>
          <option value='2'>2 - Bad</option>
          <option value='3'>3 - Good</option>
          <option value='4'>4 - Very Good</option>
          <option value='5'>5 - Excellent</option>
        </Input>
        {errors.rating && (
          <FormError data-testid='rating-error'>{errors.rating}</FormError>
        )}
      </FormGroup>
      <FormGroup>
        <label htmlFor='comment'>Comment</label>
        <Input
          name='comment'
          id='comment'
          as='textarea'
          rows={5}
          value={values.comment}
          onChange={handleChange}
          data-testid='comment-input'
        />
      </FormGroup>
      <FormButton disabled={loading} data-testid='submit-button'>
        Submit
      </FormButton>
    </Form>
  )
}

export default ReviewForm
