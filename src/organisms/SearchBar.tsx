import {AppBar, InputBase, Toolbar, withStyles} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import React, {useCallback} from "react";
import styles from './SearchBar.module.css';

interface Props {
    onChange: (value: string) => void;
}

const SearchBar = (props: Props) => {
    const {onChange} = props;
    // function componentで関数定義をする場合はuseCallbackを使うと、
    // メモ化されるのでレンダリングのために再定義されるのを防げる
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.value);
        },
        []
    );
    return (
        <AppBar position={"fixed"}>
            <Toolbar variant="dense">
                <div className={styles.search}>
                    <SearchIcon fontSize="small"/>
                    <StyledInputBase placeholder="search..." onChange={handleChange}/>
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