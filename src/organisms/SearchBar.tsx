import {AppBar, InputBase, Toolbar, withStyles} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import React from "react";
import styles from './SearchBar.module.css';

interface Props {
    onChange: (value: string) => void;
}

const SearchBar = (props: Props) => {
    const {onChange} = props;
    // コンポーネントがレンダリングされるたびに再定義される
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };
    return (
        <AppBar position={"fixed"}>
            <Toolbar variant="dense">
                <div className={styles.search}>
                    <SearchIcon fontSize="small"/>
                    <StyleInputBase placeholder="search..." onChange={handleChange}/>
                </div>
            </Toolbar>
        </AppBar>
    );
};

// withStyle()を使用してスタイルを上書きしている
const StyledInputBase = withStyles({
    root: {
        flexGrow: 1,
        marginLeft: '5px',
        color: '#fff'
    }
})(InputBase);

export default SearchBar;