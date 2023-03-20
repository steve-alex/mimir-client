export default function WelcomePage({ name, logout }: any) {
  return (
    <div className='welcome'>
      <h2> Settings <span>{name}</span></h2>
    </div> 
  )
}