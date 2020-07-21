import React from 'react'
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSpinner, faRedo } from '@fortawesome/free-solid-svg-icons';
import uploadFile, { deleteFile } from '../../utils/media/FirestoreUpload';
import { errorSelectingFileState, errorFileTooLarge, noMediaState, baseMediaState, errorMediaState, errorNoUserId } from '../../utils/media/MediaStates';
import { useAppStore } from '../../providers/AppStore';




// To Do
// - Add limits for file size
// - add limits for file types
// - add upload cloud function
// - create cloud blob to upload?
// - add delete cloud function

const DropZone = ({ preNameFile, updateLocalImage, updateCloudImage, localMediaSource, userUid }) => {
    const [uploadState, setUploadState] = React.useState(noMediaState)
    const [error, setError] = React.useState(false)
    const [stateUserUid, setStateUserUid] = React.useState(userUid)

    const { user } = useAppStore()

    React.useEffect(() => {
        // if the upload state gets the property downloadUrl 
        // then update the local image with the dowloadUrl and the name of the file
        // the name of the file is used to delete the image
        if (uploadState.downloadURL) {
            updateLocalImage({ name: uploadState?.file.name, src: uploadState.downloadURL })
        }
    }, [uploadState.downloadURL, userUid])




    const handleRemoveMedia = (event) => {
        event.preventDefault()

        // remove the local image stored in formData
        updateLocalImage(false)

        console.log(uploadState)

        // delete file on server as well
        // requires file name, user uid in order to delete the image
        deleteFile({
            onDelete: () => setUploadState(baseMediaState()),
            onError: () => setUploadState(baseMediaState({
                error: true,
                message: "Error removing image, please refresh page."
            })),
            file: uploadState.file,
            userUid: user.uid,
            fileName: preNameFile
        })


    }
    const clearErrorAndMedia = (event) => {
        // stop the submission of the form
        event.preventDefault()


        // Return to base state of the media objects
        setUploadState(baseMediaState())
        // remove the local image stored in formData
        updateLocalImage(false)
    }

    const onDrop = React.useCallback(acceptedFiles => {

        const generatedPreviews = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }))

        if (generatedPreviews.length === 1) {
        
            
            
            // If no user id then show an error.
            if (user.uid) {
                updateLocalImage({
                    name: generatedPreviews[0].name,
                    src: generatedPreviews[0].preview
                })
                uploadFile({
                    file: acceptedFiles[0],
                    fileName: preNameFile,
                    fileType: acceptedFiles[0].type,
                    userUid: user.uid,
                    uploadState,
                    setUploadState
                })
            } else {
                return setUploadState(errorNoUserId)
            }

            // Problems with file selector error
        } else {
            setUploadState(errorSelectingFileState)
        }

    }, [userUid])
    const onDropRejected = React.useCallback(rejectedFiles => {
        const { errors } = rejectedFiles[0]
        if (errors) {

            const { code, message } = errors[0]
            setUploadState(errorMediaState(code, message))

        }
        console.log(rejectedFiles)
        // setUploadState(errorSelectingFileState)
    }, [])




    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: 'image/jpeg, image/png, image/jpg',
        maxSize: 3145728,
        onDropRejected
    })

    return (
        <div className="mt-6 sm:mt-5 sm:items-start" {...getRootProps()}>

            <div className="mt-2 sm:mt-0 bg-gray-50 ">
                {/* Remove background and profile images if switched to base tier */}
                {(!uploadState.active && !localMediaSource) ? <div className=" flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="text-center">
                        {!uploadState.error ? <> <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                            <input {...getInputProps()} />
                        </> : < button onClick={clearErrorAndMedia} className="text-gray-500 px-4 py-2 hover:bg-gray-300 rounded-md" >
                                <FontAwesomeIcon icon={faRedo} />
                                <p>Reset</p>

                            </button>
                        }

                        {isDragActive && <p>Drop the files here ...</p>}
                        {!isDragActive && !uploadState.error ? (<>
                            <p className="mt-1 text-sm text-gray-600">
                                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out">
                                    Upload a file {" "}
                                </button>
                                {" "}or drag and drop
                                        </p>
                            <p className="mt-1 text-xs text-gray-500">
                                PNG, JPEG, JPG up to 3mb
                                    </p>
                        </>)
                            : <p className="mt-1 text-red-500" >{uploadState.message}</p>
                        }
                    </div>
                </div>
                    :
                    <>
                        <div className="w-full flex relative">
                            {uploadState.active && <div className="absolute w-2/3 flex h-36 z-10 bg-gray-900 text-white" style={{
                                // width: "25%",
                                opacity: 0.4
                            }}>
                                <div className="self-center m-auto">
                                    <FontAwesomeIcon icon={faSpinner} spin /> {uploadState.progress.toFixed(0)}% ... uploading
                                </div>
                            </div>}
                            <div className="w-3/4 h-36 rounded-l-md overflow-hidden">
                                <img className="object-cover h-36  w-full" src={localMediaSource} alt="Preview Media" />
                            </div>
                            <div className="w-1/4 rounded-r-md flex">
                                <button className="px-2 hover:bg-red-300 w-full py-4 bg-gray-200 rounded-r-md "
                                    onClick={handleRemoveMedia}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>

                        </div>

                    </>
                }


            </div>
        </div>
    )
}

DropZone.propTypes = {

}

export default DropZone