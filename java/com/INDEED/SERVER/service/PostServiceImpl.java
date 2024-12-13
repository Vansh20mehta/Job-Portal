package com.INDEED.SERVER.service;

import com.INDEED.SERVER.dao.PostDao;
import com.INDEED.SERVER.dto.PostDTO;
import com.INDEED.SERVER.model.PostModal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PostServiceImpl implements PostService{
    @Autowired
    PostDao postDao;

    @Override
    public PostModal savePost(PostDTO postDTO) {
        PostModal postModal = new PostModal();
        postModal.setProfile(postDTO.getProfile());
        postModal.setDescription(postDTO.getDescription());
        postModal.setSalary(postDTO.getSalary());
        postModal.setTechnology(postDTO.getTechnology());
        postModal.setType(postDTO.getType());
        postModal.setExperience(postDTO.getExperience());

        return postDao.save(postModal);
    }

    @Override
    public List<PostModal> getAllPosts() {
        return postDao.findAll();
    }

}
