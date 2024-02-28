export default function CoreTopic({rewards, topic, alpha}){
    return (
        <li>
            <p>{rewards}</p>
            <p>{topic}</p>
            <p>{alpha}</p>
        </li>
    )
}