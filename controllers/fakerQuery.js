class fakerQuery {
    constructor(fakerData){
        this.id = 1
        for (const k in fakerData.data){
            fakerData.data[k].modifyAt=0
            if (typeof fakerData.data[k].id == 'undefined'){
                fakerData.data[k].id=this.id+0
                this.id++
            } else if (fakerData.data[k].id>this.id) this.id = fakerData.data[k].id + 1
        }
        this.bdd = fakerData        
    }
    query_get(){ return this.bdd.data } // QueryAll
    query_getid(id){                    // Query ID = ?
        for(let k in this.bdd.data) if (this.bdd.data[k].id == id) return this.bdd.data[k]
        return {}
    }
    query_post(data){                   // Create Query
        let d = this.extractData(data)
        d[id] = this.id + 0
        this.bdd.data.push(d)
        this.id ++
        return this.bdd.data[this.bdd.data.length-1]
    }
    query_put(data){                    // Update Query
        let dt = this.extractData(data)
        if (dt.id == undefined) return []
        for(let k in this.bdd.data){
            if (this.bdd.data[k].id == dt.id){
                this.bdd.data[k] = this.updateData(dt,this.bdd.data[k])
                return this.bdd.data[k]
            }
        }
        throw 'PUT Non valide'
    }
    query_delete(id){                 // Delete Query
        if (typeof id == 'undefined') return false
        let old_length = this.bdd.data.length
        this.bdd.data=this.bdd.data.filter(d => d.id!=id)
        if (old_length == this.bdd.data.length) throw 'DELETE pas de champ à supprimer'
        return true
    }
    extractData(data){
        let keys = Object.keys(this.bdd.struct)
        let dt = {}
        for (const d of keys){
            dt[d] = data[d] || undefined
            if (dt[d]!=undefined){
                
                switch (this.bdd.struct[d]){
                    case 'integer':
                        if (!/^[0-9]*$/.test(dt[d])) {
                            console.log('key '+d,'"',dt[d],'" type ',this.bdd.struct[d],' Warning Donnée non valide');
                            throw 'key '+d+' n\'est pas entier'
                        }
                }
            }
        }
        return dt
    }
    updateData(data,oldData){
        let dt = oldData
        for (const key in dt){
            dt[key] = ( (typeof data[key] == 'undefined') ? dt[key] : data[key] ) || undefined
        }
        return dt
    }
    restApiGet(req,res){ res.json(this.query_get()) }
    restApiGetId(req,res){
        try {
            res.json(this.query_getid(req.params.id))
        } catch (e){
            res.status(404).json([])
        }
    }
    restApiPost(req,res){
        try {
            res.json(this.query_post(req.body))
        } catch (e){
            res.status(404).json({'err':'requete non valide'})
        }
    }
    restApiPut(req,res){
        try {
            res.json(this.query_put(req.body))
        } catch (e){
            res.status(404).json({'err':'requete non valide'})
        }
    }
    restApiDelete(req,res){
        try {
            if (req.params.id) return res.json(this.query_delete(req.params.id))
        } catch (e){
            res.status(404).json({'err':'requete non valide'})
        }
        res.status(404).json({'err':'enregistrement non trouvé'})
    }
}

exports.fakerQuery = fakerQuery