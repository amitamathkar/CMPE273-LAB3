package dropbox.dropbox.repository;
import dropbox.dropbox.model.activity;
import dropbox.dropbox.model.users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ActivityRepository extends MongoRepository<activity,String> {

    @Query("{username : ?0 }")
    List<activity> findAllByUsername(String username);
}
