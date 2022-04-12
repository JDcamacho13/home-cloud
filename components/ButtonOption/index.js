const ButtonOption = ({ title, onClick }) => {
    return (
        <span className='options' onClick={onClick}>
            { title }

            <style jsx>{`

                .options {
                    padding: 10px;
                    color: white;
                    cursor: pointer;
                    transition: all 0.25s ease;
                }

                .options:hover {
                    color: #09f;
                }

            `}</style>
        </span>
    )
}

export default ButtonOption