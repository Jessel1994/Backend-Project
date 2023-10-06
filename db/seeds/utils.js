const format = require('pg-format')
const db = require('../connection')

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.formatComments = (comments, idLookup) => {
  return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
    const article_id = idLookup[belongs_to];
    return {
      article_id,
      author: created_by,
      ...this.convertTimestampToDate(restOfComment),
    };
  });
};

exports.checkExists = async (table, column, value) => {
  const queryStr = format(`SELECT * FROM %I WHERE %I = $1`, table, column)
  const dbOutput = await db.query(queryStr, [value]);

  if (dbOutput.rows.length === 0) { 
    return Promise.reject({
      status: 404, 
      msg: 'Article doesn\'t exist'
    })
  }
  
}

exports.checkUserExists = async (table, column, value) => {
  const queryStr = format(`SELECT * FROM %I WHERE %I = $1`, table, column)
  const dbOutput = await db.query(queryStr, [value]);

  if (dbOutput.rows.length === 0) { 
    return Promise.reject({
      status: 404, 
      msg: "User Does not Exist"
    })
  }
  
}

exports.validateComment = async(comment) => {
  if (!comment.hasOwnProperty('username') || !comment.hasOwnProperty('body')) {
    return Promise.reject({
      status: 400, 
      msg: "Body is Malformed"
    })
  }
  if (typeof comment.username !== "string" || typeof comment.body !== "string") {
        
    return Promise.reject({
        status: 400, 
        msg: 'Schema Validation Failed'
    })
}
  
}

exports.validateVotes = async(inc_votes) => {
  if (typeof inc_votes.inc_votes !== "number") {
    return Promise.reject({
      status: 400, 
      msg: 'Schema Validation Failed'
    })

  }
  if (!inc_votes.hasOwnProperty('inc_votes')) {
    return Promise.reject({
      status: 400, 
      msg: "Body is Malformed"
    })

  }
 
}

