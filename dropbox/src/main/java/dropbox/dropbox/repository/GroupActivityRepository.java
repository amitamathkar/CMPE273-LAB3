package dropbox.dropbox.repository;
import dropbox.dropbox.model.groups;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface GroupActivityRepository extends MongoRepository<groups,String> {

    @Query("{username : ?0 }")
    List<groups> findAllByUsername(String username);
}
