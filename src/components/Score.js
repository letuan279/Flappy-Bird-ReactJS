import { memo } from "react"

const Score = ({ score }) => {
    const arrScore = score.toString().split('')

    return (
        <div style={{
            position: "absolute",
            height: 36,
            width: '100%',
            top: 50,
            zIndex: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 5
        }}>
            {arrScore.map((item, index) => (
                <div key={`score${index}`} style={{
                    width: 24,
                    height: 36,
                    backgroundImage: `url('/images/${item}.png')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}></div>
            ))}
        </div>
    )
}

export default memo(Score)