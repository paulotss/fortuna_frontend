import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SectionLinkProps {
  icon: ReactNode;
  title: string;
  link: string;
}

function SectionLink(props: SectionLinkProps) {
  const { icon, link, title } = props;
  return (
    <Link to={link} className=''>
      <div className='w-32 h-32 bg-amber-400 mr-2 p-5 flex flex-col justify-center'>
        <div className='text-2xl text-center'>{ icon }</div>
        <p className='text-xs text-center'>{ title }</p>
      </div>
    </Link>
  )
}

export default SectionLink;
