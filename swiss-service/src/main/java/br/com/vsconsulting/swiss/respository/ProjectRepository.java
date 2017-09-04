package br.com.vsconsulting.swiss.respository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.vsconsulting.swiss.model.entities.Project;

public interface ProjectRepository extends PagingAndSortingRepository<Project, String> {
	
	@Query("{ $and : [ "
			+ "        { $or : [  { $where: '?1 == false' },  { archivationDate: { $exists: false } } ] }, "
			+ "        { $or: [ "
			+ "                 { $or : [ { $where: '?0 == null' } , { title : { $regex : ?0 } } ] } , "
			+ "                 { $or : [ { $where: '?0 == null' } , { summary : { $regex : ?0 } } ] } , "
			+ "                 { $or : [ { $where: '?0 == null' } , { description : { $regex : ?0 } } ] }"
			+ "               ] } "
			+ "       ] }" )
	Page<Project> search(String name, boolean onlyAtives, Pageable pageable);

}
