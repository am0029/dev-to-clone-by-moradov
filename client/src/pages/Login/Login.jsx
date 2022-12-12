import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import Error from '../../common/Error';
import LoadingSpinner from '../../common/LoadingSpinner';
import OAuth from '../../common/OAuth';
import RouteWrapper from '../../common/RouteWrapper';
import { useLoginMutation } from '../../core/features/auth/authApiSlice';
import { setCredentials, setOAuthed, setToken } from '../../core/features/auth/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');

  const emailRef = useRef(null);

  const [login, { isLoading, isError, isSuccess, reset }] = useLoginMutation();

  useEffect(() => emailRef.current.focus(), []);

  useEffect(() => {
    reset();
    dispatch(setOAuthed(false));
    isSuccess && navigate('/');
  }, [email, pwd]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const {
        id,
        name,
        username,
        picture,
        bio,
        location,
        education,
        work,
        availableFor,
        skills,
        createdAt,
        token,
      } = await login({ email, pwd }).unwrap();

      dispatch(
        setCredentials({
          id,
          name,
          username,
          email,
          picture,
          bio,
          location,
          education,
          work,
          availableFor,
          skills,
          createdAt,
        })
      );
      dispatch(setToken(token));

      setEmail('');
      setPwd('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RouteWrapper>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Wrapper>
          <Heading style={{marginTop:'-110px'}}>به بابا کد خوش امدید</Heading>
          <Paragraph style={{fontSize:'1.2rem'}}>بابا کد بزرگترین مرجع آنلاین برنامه نویسی 
          <br />
            <br />برای ورود با اکانت های گوگل و گیت هاب روی لینک های زیر کلیک کنید
          </Paragraph>
          <OAuth style={{display:'inline-block'}} />
          {/* <Paragraph style={{ fontSize: '1.2rem' }} >یا</Paragraph> */}

          <Title style={{ fontSize: '1.2rem' }}>اگر قبلا ثبت نام کرده اید برای ورود  ایمیل و پسورد خود را وارد کنید</Title>
          <form onSubmit={handleSubmit}>
            <InputContainer>
              <Label style={{textAlign:'right', fontSize:'1.3rem'}} htmlFor='email'>ایمیل *</Label>
              <Input
                ref={emailRef}
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </InputContainer>

            <InputContainer>
              <Label style={{ textAlign: 'right', marginTop: '-20px' ,fontSize:'1.3rem'}} htmlFor='password'>پسورد *</Label>
              <Input
                type='password'
                name='password'
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                required
              />
            </InputContainer>

            {isError && <Error>ایمیل و رمز عبورتان را بررسی کنید اشتباه است</Error>}

            <Submit style={{marginTop:'-20px'}}>ورود</Submit>
          </form>
        </Wrapper>
      )}
    </RouteWrapper>
  );
};

const Submit = tw.button`bg-blue text-white py-2 mt-8 w-full rounded-lg`;

const Heading = tw.h1`font-bold my-6`;

const Title = tw.h2`my-6`;

const Paragraph = tw.p`my-4`;

const InputContainer = tw.div`text-left mb-8`;

const Label = tw.label`block mb-2`;

const Input = tw.input`outline-none rounded-lg border border-solid border-light-gray w-full py-2 px-3 focus:border-blue`;

const Wrapper = tw.div`bg-white text-center max-w-2xl mx-auto py-12 px-10 rounded-md`;

export default Login;
