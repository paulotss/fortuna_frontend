interface IProps {
  rows: number
  titles: string[]
}

function GridList(props: IProps) {
  const { rows, titles } = props;

  return (
    <div className={`grid grid-rows-${rows}`}>
      {
        titles.map((title) => (
          <div>{title}</div>
        ))
      }
    </div>
  )
}

export default GridList;