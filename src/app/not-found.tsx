import Image from 'next/image'

export default function NotFound() {
  return (
    <>
      <div className='w-full h-full'>
        <Image 
          src="/preview.jpg"
          alt='404 not found'
          fill={true}
          className='object-contain'
        />
      </div> 
    </>
  )
}