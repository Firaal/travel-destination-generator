interface ButtonProps {
    name: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    theme?: "dark" | "light";
}

const Button: React.FC<ButtonProps> = ({ name, theme, onClick }) => {
    return (
        <button onClick={onClick} className={theme}>
            {name}
        </button>
    );
};

export default Button;
