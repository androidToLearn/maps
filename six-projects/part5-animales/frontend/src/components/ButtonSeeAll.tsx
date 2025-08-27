import '../styles/btnseeall.scss'


export default function seeAll()
{
    return <div className="card" onClick={()=>{
        window.location.href = '/animals'
    }}>
        <div className='circle'>
            <p className='seeAllText'>see all animals</p>
        </div>
    </div>
}