import React, { useState, useEffect } from 'react';
import { Navbar } from '../Components';
import { useSelector, useDispatch } from 'react-redux';
import { getWatchList, updateEpisodeWatchList } from '../redux/actions/myWatchList';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import './MyWatchList.scss' 

const MyWatchList = () => {
    const dispatch = useDispatch();
    const [editRowIndex, setEditRowIndex] = useState(-1);
    const { list } = useSelector((state) => state.myWatchList);
    const [titleEdit, setTitleEdit] = useState("");
    const [addListItem, setAddListItem] = useState({
        title: "",
        episode:"",
        completed: false
    });
    const [errorsFields, setErrorsFields] = useState({
        title: false,
        episode: false,
    })
    useEffect(() => {
        dispatch(getWatchList());
    }, [dispatch]);

    useEffect(() => {
        if (editRowIndex === -1) {
            setTitleEdit("")
        }
        else {
            setTitleEdit(list[editRowIndex].title)
        }
    }, [editRowIndex, list])

    return (
        <div className="my--watch--list--page">
            <Navbar />
            <div className="add--episode--section">
                <TextField
                    label="Title"
                    variant="outlined"
                    size="small"
                    value={addListItem.title}
                    onChange={(e) => setAddListItem({ ...addListItem, title: e.target.value })}
                    error={errorsFields.title}
                />
                <TextField
                    label="Episode"
                    variant="outlined"
                    size="small"
                    value={addListItem.episode}
                    onChange={(e) => setAddListItem({ ...addListItem, episode: e.target.value })}
                    error={errorsFields.episode}
                />
                <Button 
                    variant="contained"
                    color="primary"
                    endIcon={<PlaylistAddIcon/>}
                    onClick={() => {
                        if (addListItem.title !== '' && addListItem.episode !== '') {
                            const copyList = [...list];
                            copyList.push(addListItem);
                            dispatch(updateEpisodeWatchList(copyList));
                            setAddListItem({ title: "", episode: "", completed: false })
                        }
                        let errortitle = false;
                        let errorEpisode = false;
                        if (addListItem.title === '') {
                            setErrorsFields({ episode: errorEpisode, title: true})
                            errortitle = true;
                        }
                        else {
                            setErrorsFields({ episode: errorEpisode, title: false});
                            errortitle = false;
                        }
                        if (addListItem.episode === '') {
                            setErrorsFields({ title: errortitle, episode: true})
                            errorEpisode = true;
                        }
                        else {
                            setErrorsFields({ title: errortitle, episode: false});
                            errorEpisode = false;
                        }
                    }}
                >
                    Add To List
                </Button>
            </div>
            <div className="render--watch--list--container">
                {!list.length && <h3>Empty List</h3>}
                {!!list.length && (
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Episode</th>
                                <th>Completed</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {list.map((elem, index) => {
                                const { title, episode, completed } = elem;
                                return (
                                    <tr
                                      className={completed ? "completed" : ""}
                                      key={index.toString()}
                                    >
                                        <td>
                                            {
                                                editRowIndex !== index ? (
                                                    title
                                                ) : (
                                                    <Input
                                                        value={titleEdit}
                                                        onChange={(e) => setTitleEdit(e.target.value)}
                                                    />
                                                )
                                            }
                                        </td>
                                        <td>{episode}</td>
                                        <td>
                                            <Checkbox
                                                checked={completed}
                                                onChange={(e) => {
                                                    let elemCopy = { ...elem }
                                                    elemCopy.completed = e.target.checked;
                                                    const copyList = [ ...list ];
                                                    copyList.splice(index, 1, elemCopy);
                                                    dispatch(updateEpisodeWatchList(copyList));
                                                }}
                                            />
                                        </td>
                                        <td>
                                            {editRowIndex !== index ? (
                                                <>
                                                    <IconButton color="primary" onClick={() => setEditRowIndex(index)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        color="secondary"
                                                        onClick={() => {
                                                            const copyList = [ ...list ];
                                                            copyList.splice(index, 1);
                                                            dispatch(updateEpisodeWatchList(copyList));
                                                        }}
                                                    >
                                                        <DeleteOutlineIcon />
                                                    </IconButton>
                                                </>
                                            ) : (
                                                <>
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() =>{
                                                            let elemCopy = { ...elem }
                                                            elemCopy.title = titleEdit;
                                                            const copyList = [ ...list ];
                                                            copyList.splice(index, 1, elemCopy);
                                                            dispatch(updateEpisodeWatchList(copyList));
                                                            setEditRowIndex(-1);
                                                        }}
                                                    >
                                                        <SaveIcon />
                                                    </IconButton>
                                                    <IconButton color="secondary" onClick={() => setEditRowIndex(-1)}>
                                                        <CancelIcon />
                                                    </IconButton>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default MyWatchList;