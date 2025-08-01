import { widgets } from "src/components";

const formCharacterCreation = (props) => {
    return(
    <form className={props.className}>
        <widgets.FieldInput label="Character Name" name="characterName" />
        <widgets.FieldInput label="Character Ancestry" name="characterAncestry" />
        <widgets.FieldInput label="Character Background" name="characterBackground" />
        <widgets.FieldInput label="Character Class" name="characterClass" />
    </form>
    )
}

export default formCharacterCreation;