package br.com.vsconsulting.swiss.service;

import br.com.vsconsulting.swiss.model.entities.Client;
import br.com.vsconsulting.swiss.respository.ClientRepository;
import br.com.vsconsulting.swiss.to.ClientSearchTo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    private ClientRepository repository;

    public Client load(String id) {
        return this.repository.findOne(id);
    }

    public Client save(Client entity) {
        return this.repository.save(entity);
    }

    public Page<Client> search(ClientSearchTo searchTo) {
        if(searchTo == null) {
            return null;
        }
        if(searchTo.getSearchTerm() == null) {
            searchTo.setSearchTerm("");
        }
        if(searchTo.getSort() == null) {
            searchTo.setSort(new Sort(new Sort.Order(Sort.Direction.ASC, "title")));
        }
        return this.repository.search(searchTo.getSearchTerm(), searchTo);
    }

    public Iterable<Client> listAll() {
        return this.repository.findAll();
    }

}
