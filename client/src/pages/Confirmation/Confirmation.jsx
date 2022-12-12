import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'twin.macro';
import LoadingController from '../../common/LoadingController';
import RouteWrapper from '../../common/RouteWrapper';
import { useLazyLogoutQuery } from '../../core/features/auth/authApiSlice';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import { useDeleteUserMutation } from '../../core/features/users/usersApiSlice';
import { capitalizeFirstLetter } from '../../helpers/string';
import useRequireAuth from '../../hooks/useRequireAuth';

const Confirmation = () => {
  const navigate = useNavigate();
  const { confirmType } = useParams();
  const [trigger] = useLazyLogoutQuery();
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const { id } = useSelector(selectCurrentUser);
  const { isAuthed, handleAuth } = useRequireAuth();

  const handleConfirmation = async () => {
    if (isAuthed) {
      try {
        confirmType.includes('delete') && (await deleteUser({ id }).unwrap());
        trigger();

        navigate('/');
      } catch (err) {
        console.log(err);
      }
    } else handleAuth();
  };

  return (
    <RouteWrapper>
      <Wrapper>
        <Heading >خروج از وب سایت ؟
          {/* {confirmType.replace('-', ' ')} */}
          </Heading>
        <LoadingController isLoading={isLoading}>
          <ConfirmButton style={{"backgroundColor": "red","color": "black","fontSize":"50px", "padding" : "0.5px 50px"}} onClick={handleConfirmation}>
            بله     
             {/* {capitalizeFirstLetter(confirmType.replace('-', ' '))} */}
          </ConfirmButton>
        </LoadingController>
      </Wrapper>
    </RouteWrapper>
  );
};

const Heading = tw.h1``;

const ConfirmButton = tw.button`text-white bg-blue rounded-md py-4 px-6 mt-6`;

const Wrapper = tw.div`text-center`;

export default Confirmation;
