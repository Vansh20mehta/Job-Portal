package com.INDEED.SERVER.dao;

import com.INDEED.SERVER.model.PostModal;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostDao extends MongoRepository<PostModal,String>{


}
