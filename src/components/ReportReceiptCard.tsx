import { ReactNode } from 'react';

interface IProps {
  title: string;
  input: number | undefined;
  output: number | undefined;
  icon: ReactNode
}

function ReportReceiptCard(props: IProps) {
  const { title, input, output, icon } = props;

  return (
    <div className='mr-2 mb-2 w-64'>
      <div className='p-2 bg-amber-400 rounded-tr-lg text-neutral-900 font-bold'>
        { icon } { title }
      </div>
      <p className="font-bold text-right text-green-600">
        {
          (input || 0)
            .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        }
      </p>
      <p className="font-bold text-right text-red-600">
        {
          (output || 0)
            .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        }
      </p>
      <p className="font-bold text-right text-neutral-900 text-2xl">
        {
          ((input || 0) + (output || 0))
            .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        }
      </p>
    </div>
  )
}

export default ReportReceiptCard;
