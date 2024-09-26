// import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
// import { getMe, deleteBook } from '../utils/API';
import { QUERY_GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';



const SavedBooks = () => {
  // const [userData, setUserData] = useState({});

  const { loading, error, data } = useQuery(QUERY_GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);
  // const [savedBooks, setSavedBooks] = useState(data?.me.savedBooks || []);

  // use this to determine if `useEffect()` hook needs to run again
  // const userDataLength = Object.keys(userData).length;

  const userData = data?.me || {};
  // const userDataLength = userData.savedBooks?.length || 0;

  if (Auth.loggedIn() && Auth.getProfile().data._id === userData) {
    return <Navigate to="/me" />;
  }


  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;

  //       if (!token) {
  //         return false;
  //       }

  //       const response = await getMe(token);

  //       if (!response.ok) {
  //         throw new Error('something went wrong!');
  //       }

  //       const user = await response.json();
  //       setUserData(user);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getUserData();
  // }, [userDataLength]);



  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // try {
    //   const response = await deleteBook(bookId, token);

    //   if (!response.ok) {
    //     throw new Error('something went wrong!');
    //   }

    //   const updatedUser = await response.json();
    //   setUserData(updatedUser);
    //   // upon success, remove book's id from localStorage
    //   removeBookId(bookId);
    // } catch (err) {
    //   console.error(err);
    // }

    try {
      const { data: removeBookData } = await removeBook(
        {
          variables: { bookId },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        });

      //   if (!data) {
      //     throw new Error('Something went wrong.');
      //   }


      //   setUserData(data.removeBook)
      // removeBookId(bookId);

      if (removeBookData) {
        console.log('Book removed:', removeBookData);
        removeBookId(bookId)
      }

    } catch (err) {
      console.log(err);
    }

  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error.message}</h2>;

  // if (!userData.savedBooks.length) {
  //   return <h2> You have no saved books yet.</h2>;
  // }

  // if data isn't here yet, say so
  // if (!userDataLength) {
  // //   return <h2>LOADING...</h2>;
  // }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col key={book.bookId} md="4">
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
