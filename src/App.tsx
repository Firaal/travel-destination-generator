import { FormEvent, useState } from "react";
import { Loader, Placeholder } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import outputs from "../amplify_outputs.json";
import "./App.css";

import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const amplifyClient = generateClient<Schema>({
    authMode: "userPool",
});

export default function App() {
    const [result, setResult] = useState<string>();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);

        const { data, errors } = await amplifyClient.queries.askBedrock({
            interests: [formData.get("interests")?.toString() || ""],
        });

        try {
            if (!errors) {
                setResult(data?.body || "No data returned");
            } else {
                console.log(errors);
            }
        } catch (e) {
            alert(`An error ocurred: ${e}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <div className="header-container">
                <h1 className="main-header">
                    Conheça seu <span className="highlight">Gerador de Destino de Viagem Pessoal</span>
                </h1>

                <p className="description">
                    Simplesmente digite alguns interesses usando o seguinte formato interesse1, interesse2, etc. O gerador irá retornar com ótimos
                    destino de viagem para você!
                </p>
            </div>

            <form onSubmit={handleSubmit} className="form-container">
                <div className="search-container">
                    <input
                        type="text"
                        className="wide-input"
                        id="interests"
                        name="interests"
                        placeholder="Digite seus interesses separados por vírgula. Interesse1, Interesse2, Interesse3, ...etc"
                    />
                    <button type="submit" className="search-button">
                        Generate
                    </button>
                </div>
            </form>

            <div>
                {loading ? (
                    <div className="loader-container">
                        <p>Loading...</p>
                        <Loader size="large" />
                        <Placeholder size="large" />
                        <Placeholder size="large" />
                        <Placeholder size="large" />
                    </div>
                ) : (
                    <div className="result-container">{result && <p className="result">{result}</p>}</div>
                )}
            </div>
        </div>
    );
}
