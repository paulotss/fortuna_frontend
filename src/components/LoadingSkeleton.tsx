import { Skeleton } from "@mui/material";

function LoadingSkeleton() {
  return (
    <main>
      <Skeleton variant='rectangular' height={70} width='100%' />
      <section className='flex flex-wrap justify-start ml-20 mt-4'>
        <div className='mr-2'>
          <Skeleton variant='rectangular' height={128} width={128} />
        </div>
        <div className='mr-2'>
          <Skeleton variant='rectangular' height={128} width={128} />
        </div>
        <div className='mr-2'>
          <Skeleton variant='rectangular' height={128} width={128} />
        </div>
        <div className='mr-2'>
          <Skeleton variant='rectangular' height={128} width={128} />
        </div>
      </section>
    </main>
  )
}

export default LoadingSkeleton;
