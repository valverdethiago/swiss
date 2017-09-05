package br.com.vsconsulting.swiss.respository;

import br.com.vsconsulting.swiss.model.entities.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ClientRepository extends PagingAndSortingRepository<Client, String> {

    @Query("{ $and : [ "
            + "        { $or: [ "
            + "                 { $or : [ { $where: '?0 == null' } , { surname : { $regex : ?0 } } ] } , "
            + "                 { $or : [ { $where: '?0 == null' } , { name : { $regex : ?0 } } ] }  "
            + "               ] } "
            + "       ] }" )
    Page<Client> search(String searchTerm, Pageable pageable);

}
