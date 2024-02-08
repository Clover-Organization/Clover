//FinishRequest.jsx

import user from '../../assets/user.png'
import UserPreview from '../userPreview/UserPreview';

const FinishRequest = ({ singleRequest, handleFinishAction, editedRequest }) => (
    <>
        <div className="userPreview">

            <div className="password-update-modal">
                <h5>Deseja finalizar a request com o ID:</h5>
                <p>{singleRequest.id}</p>
            </div>

            <UserPreview
                user={singleRequest.user}
            />
            <div className="btnSave">
                <button onClick={() => handleFinishAction(editedRequest)}>Finish!</button>
            </div>
        </div>
    </>
)

export default FinishRequest;