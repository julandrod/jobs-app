
const JobInfo = ({icon, text}) => {
  return (
    <div className="flex items-center">
        <span className="text-base mr-4 flex items-center text-secondaryTextColor">{icon}</span>
        <span className="capitalize tracking-wide">{text}</span>
    </div>
  )
}

export default JobInfo