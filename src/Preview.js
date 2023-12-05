import React, { useEffect } from 'react';
import './Preview.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectCameraImage } from './features/cameraSlice';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { resetCameraImage } from './features/cameraSlice';
import TextField from '@mui/material/TextField';
import CreateIcon from '@mui/icons-material/Create';
import NoteIcon from '@mui/icons-material/Note';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuid} from 'uuid';
import { db } from './firebase';
import { storage } from './firebase';
import firebase from 'firebase/app';


function Preview() {
    const cameraImage = useSelector(selectCameraImage);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!cameraImage) {
            history.replace('/');
        }
    }, [cameraImage, history]);

    const closePreview = () => {
        dispatch(resetCameraImage());

    };

    const sendPost = () => {
        const id = uuid();
        const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage, 'data_url');

        uploadTask.on('state_changed', null, (error) => {
            console.log(error);
        }, 
        () => {
            storage.ref('posts').child(id).getDownloadURL().then((url) => {
                db.collection('posts').add({
                    imageUrl: url,
                    username: 'Anonymous',
                    read: false,
                    //profilePic,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
                history.replace('/chats');
            });
        }
        ); 
    };

  return (
    <div className='preview'>
        <CloseIcon onClick={closePreview} className='preview__close' />
        <div className='preview__toolbarRight'>
            <TextField className='preview__text' />
            <CreateIcon />
            <NoteIcon />
            <MusicNoteIcon />
            <AttachFileIcon />
            <CropIcon />
            <TimerIcon />
        </div>
        <img src={cameraImage} alt='' />
        <div onClick={sendPost} className='preview__footer'>
            <h2>Send Now</h2>
            <SendIcon fontSize='small' className='preview__sendIcon' />
        </div>

    </div>
  )
}

export default Preview;