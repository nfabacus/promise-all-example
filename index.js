const promiseExample = async () => {
  const promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve({ id1: 'abc123', id2: 'xyz321' });
      // reject({code: 500, message: 'An error occured!'})

    }, 5000);
  });

  let id2 = null;
  let id1 = null;
  let errors = [];

  const promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      // resolve("promise 2 data");
      reject({code: 500, message: 'An error occurred!'})

    }, 2000);
  });

  const result = await Promise.all([
    promise1
      .then((res) => {
        console.log('promise 1 : ', res);
        id2 = res.id2;
        id1 = res.id1;
      })
      .catch(err => { errors = [ err, ...errors ] }),
    promise2
      .catch(err => { errors = [ err, ...errors ] })
  ]);
  // if you catch errors inside promise.all, it will wait until all operations complete, which removes a race condition and ambiguity of results from all the promises.
  // Otherwise, it will just throw an error if any of the promise returns an error.
  // You can also collect errors as above.

  console.log('result >>> ', result);
  console.log('errors >>> ', errors);
  console.log('id1>>> ', id1);
  console.log('id2>>> ', id2);
};

promiseExample();




