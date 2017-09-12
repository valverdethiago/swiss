package br.com.vsconsulting.swiss.web.controllers;

import br.com.vsconsulting.swiss.model.entities.Client;
import br.com.vsconsulting.swiss.service.ClientService;
import br.com.vsconsulting.swiss.to.ClientSearchTo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RequestMapping("/rest/client")
@RestController
@PreAuthorize("hasRole('ADMINISTRATOR')")
public class ClientController {

    @Autowired
    private ClientService service;


    @RequestMapping(value = "/load/{id}", method = GET)
    public Client loadProject(@PathVariable("id") String id) {
        return service.load(id);
    }

    @RequestMapping(value = "/save", method = POST, consumes = { MediaType.APPLICATION_JSON_VALUE,
            MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = MediaType.APPLICATION_JSON_VALUE)
    public Client save(@RequestBody Client client) {
        return service.save(client);
    }

    @RequestMapping(value = "/find", method = POST, consumes = { MediaType.APPLICATION_JSON_VALUE,
            MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = MediaType.APPLICATION_JSON_VALUE)
    public Page<Client> find(@RequestBody ClientSearchTo pageable) {
        Page<Client> page = service.search(pageable);
        return page;
    }

    @RequestMapping(value = "/list", method = GET)
    public Iterable<Client> list() {
        return service.listAll();
    }
}
