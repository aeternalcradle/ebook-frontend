// src/components/BookDetails.js

import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { gql } from 'graphql-tag';

const GET_BOOK_BY_NAME = gql`
  query GetBookByName($bookname: String!) {
    bookByName(name: $bookname) {
      id
      name
      author
      description
      price
    }
  }
`;

function BookDetails() {
    const [bookname, setBookname] = useState('');
    const [getBookByName, { loading, error, data }] = useLazyQuery(GET_BOOK_BY_NAME);

    const handleSearch = () => {
        getBookByName({ variables: { bookname } });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const book = data?.bookByName;

    return (
        <div>
            <label>
                Enter Book Name:
                <input
                    type="text"
                    value={bookname}
                    onChange={(e) => setBookname(e.target.value)}
                />
            </label>
            <button onClick={handleSearch}>Search</button>

            {book && (
                <div>
                    <h2>{book.name}</h2>
                    <p>Author: {book.author}</p>
                    <p>Description: {book.description}</p>
                </div>
            )}
        </div>
    );
}

export default BookDetails;
