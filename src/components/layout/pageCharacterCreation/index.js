import './pageCharacterCreation.css';
import { widgets } from 'src/components';
import { useState, useEffect, useReducer } from 'react';
import { loadCharacterData } from 'src/utils/loaddata';

// 1. Definindo o estado inicial
const initialState = {
    characterName: 'UnNamed Character',
    characterImage: '',
    ancestry: '',
    heritage: '',
    background: '',
    class: '',
    deity: ''
};

// 2. Criando o reducer
function formReducer(state, action) {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                [action.field]: action.value
            };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
}

const PageCharacterCreation = () => {
    // Estado para os dados carregados
    const [data, setData] = useState(null);

    // 3. Gerenciando o estado do formulário com useReducer
    const [formState, dispatch] = useReducer(formReducer, initialState);

    // Carregamento dos dados (igual ao anterior)

    useEffect(() => {
        loadCharacterData().then(setData);
    }, []);

    if (!data) return <div>Loading...</div>;

    // 4. Função genérica para atualizar campos
    const handleInputChange = (field, value) => {
        dispatch({
            type: 'UPDATE_FIELD',
            field,
            value
        });
    };

    const onCreate = (e) => {
        e.preventDefault();

        if (!formState.characterName.trim()) {
            alert("Character Name can't be 'blank'.")
            return;
        }

        if (!/^[\p{L}\p{N}' -]*$/u.test(formState.characterName)) {
            alert("Invalid characters detected.");
            return;
        }

        console.log("Character Created: ", formState.characterName)
    }

    return (
        <section className='page-character-creation'>
            <form className='form-character-creation' onSubmit={onCreate}>
                <div className='form-character-creation-title'>
                    <label>Character Creation</label>
                </div>

                <div className='form-character-creation-content'>
                    {/* Campo Nome */}
                    <div className='form-character-creation-name'>
                        <widgets.FieldInput
                            label="Name"
                            name="characterName"
                            value={formState.characterName}
                            required={true}
                            onChange={(e) => handleInputChange('characterName', e.target.value)}
                        />
                    </div>

                    {/* Campo Imagem */}
                    <div className='form-character-creation-image'>
                        <widgets.FieldInput
                            label="Image"
                            name="characterImage"
                            value={formState.characterImage}
                            onChange={(e) => handleInputChange('characterImage', e.target.value)}
                        />
                    </div>

                    {/* Seção de Traits */}
                    <div className='form-character-creation-traits'>
                        <label>Traits</label>
                    </div>

                    {/* Seção de Conceito */}
                    <div className='form-character-creation-concept'>
                        <div className='form-character-creation-concept-internal-column'>
                            <widgets.FieldListbox
                                placeholder=""
                                label="Ancestry"
                                name="ancestry"
                                options={data.ancestries}
                                value={formState.ancestry}
                                onChange={(e) => handleInputChange('ancestry', e.target.value)}
                            />

                            <widgets.FieldListbox
                                placeholder=""
                                label="Background"
                                name="background"
                                options={data.backgrounds}
                                value={formState.background}
                                onChange={(e) => handleInputChange('background', e.target.value)}
                            />

                            <widgets.FieldListbox
                                placeholder=""
                                label="Deity"
                                name="deity"
                                options={data.deities}
                                value={formState.deity}
                                onChange={(e) => handleInputChange('deity', e.target.value)}
                            />
                        </div>

                        <div className='form-character-creation-concept-internal-column'>
                            <widgets.FieldListbox
                                placeholder=""
                                label="Heritage"
                                name="heritage"
                                options={data.heritages}
                                value={formState.heritage}
                                onChange={(e) => handleInputChange('heritage', e.target.value)}
                            />

                            <widgets.FieldListbox
                                placeholder=""
                                label="Class"
                                name="class"
                                options={data.classes}
                                value={formState.class}
                                onChange={(e) => handleInputChange('class', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Botões de ação */}
                <div className='form-actions'>
                    <button
                        name="clear"
                        onClick={() => dispatch({ type: 'RESET_FORM' })}
                    >
                        Clear
                    </button>
                    <button
                        name="create"
                        className='form-actions-create'
                    >
                        Create
                    </button>
                </div>
            </form>
        </section>
    );
}

export default PageCharacterCreation;