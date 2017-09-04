package br.com.vsconsulting.swiss.respository;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.vsconsulting.swiss.model.entities.User;

public interface UserRepository  extends PagingAndSortingRepository<User, String>{

	User findByUsername(String username);

}
